/* Shared XML Dataset and Execution Engine for Browser Execution */
window.XML_DATASET = `<?xml version="1.0" encoding="UTF-8"?>
<courses>
  <course id="C101">
    <code>WEB303</code>
    <name>Web Technology</name>
    <faculty>Dr. Arun</faculty>
    <students>58</students>
    <credits>4</credits>
    <type>Theory</type>
  </course>
  <course id="C102">
    <code>AI302</code>
    <name>Artificial Intelligence</name>
    <faculty>Dr. Meena</faculty>
    <students>72</students>
    <credits>4</credits>
    <type>Theory</type>
  </course>
  <course id="C103">
    <code>WEB309</code>
    <name>Web Technology Laboratory</name>
    <faculty>Dr. Ravi</faculty>
    <students>56</students>
    <credits>2</credits>
    <type>Practical</type>
  </course>
  <course id="C104">
    <code>ML304</code>
    <name>Machine Learning</name>
    <faculty>Dr. Priya</faculty>
    <students>64</students>
    <credits>4</credits>
    <type>Theory</type>
  </course>
  <course id="C105">
    <code>DB305</code>
    <name>Database Systems</name>
    <faculty>Dr. Kumar</faculty>
    <students>42</students>
    <credits>3</credits>
    <type>Theory</type>
  </course>
</courses>`;

window.XSLT_DATASET = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="4.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>High Enrollment Course Summary - Saveetha University</title>
      </head>
      <body>
        <h2>High Enrollment Course Summary (Students &gt; 60)</h2>
        <p><strong>Student:</strong> ALUKA PARDHU | <strong>College:</strong> Saveetha University</p>
        <table border="1">
          <tr>
            <th>Course ID</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Faculty</th>
            <th>Students</th>
            <th>Credits</th>
            <th>Type</th>
          </tr>
          <xsl:for-each select="courses/course[students &gt; 60]">
            <xsl:sort select="students" data-type="number" order="descending"/>
            <tr>
              <td><xsl:value-of select="@id"/></td>
              <td><xsl:value-of select="code"/></td>
              <td><xsl:value-of select="name"/></td>
              <td><xsl:value-of select="faculty"/></td>
              <td><xsl:value-of select="students"/></td>
              <td><xsl:value-of select="credits"/></td>
              <td><xsl:value-of select="type"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

// Helper function to get parsed XML DOM Document
function getXmlDocument() {
  const parser = new DOMParser();
  return parser.parseFromString(window.XML_DATASET, 'text/xml');
}

// Helper function to evaluate XPath expression against XML Document
function evaluateXPath(xpathExpr, xmlDoc = getXmlDocument()) {
  const results = [];
  try {
    // If evaluating function like name(//*)
    if (xpathExpr.startsWith('name(')) {
      const evalResult = xmlDoc.evaluate('//*', xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      const names = new Set();
      for (let i = 0; i < evalResult.snapshotLength; i++) {
        names.add(evalResult.snapshotItem(i).nodeName);
      }
      return Array.from(names).join(', ');
    }

    const evalResult = xmlDoc.evaluate(xpathExpr, xmlDoc, null, XPathResult.ANY_TYPE, null);
    
    if (evalResult.resultType === XPathResult.NUMBER_TYPE) {
      return evalResult.numberValue;
    }
    if (evalResult.resultType === XPathResult.STRING_TYPE) {
      return evalResult.stringValue;
    }
    if (evalResult.resultType === XPathResult.BOOLEAN_TYPE) {
      return evalResult.booleanValue ? 'true' : 'false';
    }

    let node = evalResult.iterateNext();
    while (node) {
      results.push(node);
      node = evalResult.iterateNext();
    }
  } catch (err) {
    console.error('XPath Evaluation Error:', err);
  }
  return results;
}

// Render XML Syntax Highlighting
function escapeXmlHtml(xmlStr) {
  return xmlStr
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(".*?")/g, '<span class="xml-val">$1</span>')
    .replace(/(&lt;\/?[a-zA-Z0-9]+)/g, '<span class="xml-tag">$1</span>')
    .replace(/(&gt;)/g, '<span class="xml-tag">$1</span>');
}
