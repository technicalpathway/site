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

  // For JavaScript, we can use Node.js directly
  if (language === 'javascript') {
    // Create a minimal package.json
    const packageJson = {
      name: 'code-execution',
      type: 'module'
    };

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
      const process = await webcontainer.spawn('node', ['index.js']);
      let output = '';
      
      process.output.pipeTo(
        new WritableStream({
          write(data) {
            output += stripAnsi(data);
          },
        })
      );

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
  
  // For Python, we'll use Node.js to execute Python code
  if (language === 'python') {
    // Create a Python script file
    await webcontainer.mount({
      'script.py': {
        file: {
          contents: code,
        },
      },
    });

    try {
      const process = await webcontainer.spawn('python3', ['script.py']);
      let output = '';
      
      process.output.pipeTo(
        new WritableStream({
          write(data) {
            output += stripAnsi(data);
          },
        })
      );

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
        error: "Python is not available in this environment. Please use JavaScript for now."
      };
    }
  }

  // For Java, we'll use a Node.js script to execute Java code
  if (language === 'java') {
    const packageJson = {
      name: 'code-execution',
      type: 'module',
      dependencies: {
        '@javajs/core': 'latest',
        '@javajs/compiler': 'latest'
      }
    };

    await webcontainer.mount({
      'package.json': {
        file: {
          contents: JSON.stringify(packageJson, null, 2),
        },
      },
      'Main.java': {
        file: {
          contents: code,
        },
      },
    });

    try {
      // For now, return a message about Java support being in development
      return {
        success: false,
        output: null,
        error: "Java support is currently in development. Please use JavaScript or Python for now. We're working on adding full Java support soon!"
      };
    } catch (error) {
      return {
        success: false,
        output: null,
        error: "Java compilation is not yet supported in the browser environment."
      };
    }
  }

  // For other languages, return a message about current limitations
  return {
    success: false,
    output: null,
    error: `Language '${language}' is not currently supported in the browser environment. We're working on adding support for more languages.`
  };
} 