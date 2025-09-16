<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title>XML Sitemap - Phim Ảnh</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            color: #333;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 2.5em;
          }
          .header p {
            margin: 10px 0 0 0;
            font-size: 1.2em;
            opacity: 0.9;
          }
          .stats {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
          }
          .stats h2 {
            color: #667eea;
            margin-top: 0;
          }
          .url-list {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .url-item {
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background-color 0.3s;
          }
          .url-item:hover {
            background-color: #f8f9ff;
          }
          .url-item:last-child {
            border-bottom: none;
          }
          .url-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
            flex: 1;
          }
          .url-link:hover {
            text-decoration: underline;
          }
          .url-meta {
            font-size: 0.9em;
            color: #666;
            display: flex;
            gap: 15px;
          }
          .priority {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: bold;
          }
          .priority-high { background: #e8f5e8; color: #2e7d32; }
          .priority-medium { background: #fff3e0; color: #f57c00; }
          .priority-low { background: #f3e5f5; color: #7b1fa2; }
          .changefreq {
            background: #e3f2fd;
            color: #1976d2;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8em;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            color: #666;
            font-size: 0.9em;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎬 XML Sitemap</h1>
          <p>Danh sách tất cả các trang trên website Phim Ảnh</p>
        </div>
        
        <div class="stats">
          <h2>📊 Thống kê</h2>
          <p>Tổng số trang: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></p>
        </div>
        
        <div class="url-list">
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <div class="url-item">
              <a class="url-link" href="{sitemap:loc}">
                <xsl:value-of select="sitemap:loc"/>
              </a>
              <div class="url-meta">
                <span class="changefreq">
                  <xsl:value-of select="sitemap:changefreq"/>
                </span>
                <span>
                  <xsl:attribute name="class">
                    priority
                    <xsl:choose>
                      <xsl:when test="sitemap:priority &gt;= 0.9">priority-high</xsl:when>
                      <xsl:when test="sitemap:priority &gt;= 0.8">priority-medium</xsl:when>
                      <xsl:otherwise>priority-low</xsl:otherwise>
                    </xsl:choose>
                  </xsl:attribute>
                  <xsl:value-of select="sitemap:priority"/>
                </span>
              </div>
            </div>
          </xsl:for-each>
        </div>
        
        <div class="footer">
          <p>🤖 File này được tạo tự động cho search engines nhưng cũng thân thiện với người dùng</p>
          <p>Xem thêm: <a href="/site-map" style="color: #667eea;">Site Map HTML</a></p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>