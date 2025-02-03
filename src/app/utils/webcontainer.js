import { WebContainer } from '@webcontainer/api';

let webcontainerInstance = null;

// Function to strip ANSI escape codes
function stripAnsi(str) {
  return str.replace(/\u001b\[\d+m/g, '');
}

export async function getWebContainerInstance() {
  if (!webcontainerInstance) {
    webcontainerInstance = await WebContainer.boot();
  }
  return webcontainerInstance;
}

export async function executeCode(code, language = 'javascript') {
  const webcontainer = await getWebContainerInstance();
  
  // Create a package.json
  const packageJson = {
    name: 'code-execution',
    type: 'module',
    dependencies: {}
  };

  // Create the file structure
  await webcontainer.mount({
    'package.json': {
      file: {
        contents: JSON.stringify(packageJson, null, 2),
      },
    },
    'index.js': {
      file: {
        contents: code,
      },
    },
  });

  try {
    // Install dependencies if needed
    const installProcess = await webcontainer.spawn('npm', ['install']);
    const installExitCode = await installProcess.exit;
    
    if (installExitCode !== 0) {
      throw new Error('Failed to install dependencies');
    }

    // Execute the code
    const process = await webcontainer.spawn('node', ['index.js']);
    
    let output = '';
    
    // Handle process output
    process.output.pipeTo(
      new WritableStream({
        write(data) {
          // Strip ANSI escape codes before adding to output
          output += stripAnsi(data);
        },
      })
    );

    // Wait for the process to complete
    const exitCode = await process.exit;
    
    return {
      success: exitCode === 0,
      output: output || 'No output',
      error: null
    };
  } catch (error) {
    return {
      success: false,
      output: null,
      error: error.message
    };
  }
} 