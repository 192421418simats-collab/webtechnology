<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" version="4.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>High Enrollment Course Summary - Saveetha University</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background-color: #f4f6f9; }
          h2 { color: #1a237e; }
          table { border-collapse: collapse; width: 100%; max-width: 900px; background-color: #ffffff; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
          th { background-color: #28a745; color: white; padding: 12px; border: 1px solid #dee2e6; text-align: left; }
          td { padding: 10px; border: 1px solid #dee2e6; text-align: left; }
          tr:nth-child(even) { background-color: #f8f9fa; }
        </style>
      </head>
      <body>
        <h2>High Enrollment Course Summary (Students &gt; 60)</h2>
        <p><strong>Student:</strong> ALUKA PARDHU | <strong>College:</strong> Saveetha University</p>
        <table>
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

</xsl:stylesheet>
