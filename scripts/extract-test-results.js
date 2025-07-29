#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile } from 'fs/promises';

const execAsync = promisify(exec);

async function extractTestResults() {
  console.log('Running tests and extracting results...');
  
  try {
    // Run vitest with JSON reporter
    const { stdout, stderr } = await execAsync('pnpm vitest run --reporter=json', {
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    });
    
    // Parse the JSON output
    const testResults = JSON.parse(stdout);
    
    // Extract summary information
    const summary = {
      success: testResults.success,
      numTotalTests: testResults.numTotalTests,
      numPassedTests: testResults.numPassedTests,
      numFailedTests: testResults.numFailedTests,
      numSkippedTests: testResults.numSkippedTests,
      duration: testResults.duration,
      startTime: testResults.startTime,
      testSuites: []
    };
    
    // Extract detailed test information
    testResults.testResults.forEach(suite => {
      const suiteInfo = {
        name: suite.name,
        status: suite.status,
        duration: suite.duration,
        tests: suite.assertionResults.map(test => ({
          title: test.title,
          fullName: test.fullName,
          status: test.status,
          duration: test.duration,
          failureMessages: test.failureMessages
        }))
      };
      summary.testSuites.push(suiteInfo);
    });
    
    // Save results to file
    await writeFile('test-results.json', JSON.stringify(summary, null, 2));
    console.log('Test results saved to test-results.json');
    
    // Print summary to console
    console.log('\nTest Summary:');
    console.log(`Total tests: ${summary.numTotalTests}`);
    console.log(`Passed: ${summary.numPassedTests}`);
    console.log(`Failed: ${summary.numFailedTests}`);
    console.log(`Duration: ${summary.duration}ms`);
    
  } catch (error) {
    if (error.code === 'ELIFECYCLE') {
      // Test failures still produce valid JSON output in stdout
      console.error('Tests failed, but results were extracted');
    } else {
      console.error('Error running tests:', error.message);
      process.exit(1);
    }
  }
}

extractTestResults();