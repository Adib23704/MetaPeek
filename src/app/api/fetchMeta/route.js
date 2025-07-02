import axios from "axios";
import * as cheerio from "cheerio";
import validator from "validator";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return Response.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  let normalizedUrl = url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    normalizedUrl = `https://${url}`;
  }

  if (!validator.isURL(normalizedUrl, { require_protocol: true })) {
    return Response.json({ error: "Invalid URL format" }, { status: 400 });
  }

  try {
    const response = await axios.get(normalizedUrl, {
      timeout: 10000,
      maxRedirects: 5,
      headers: {
        "User-Agent": "MetaPeek/1.0 (Website Metadata Preview Tool)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const title =
      $("title").text().trim() ||
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      "No title found";

    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      "No description found";

    let ogImage =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $('meta[name="twitter:image:src"]').attr("content");

    if (ogImage && !ogImage.startsWith("http")) {
      const baseUrl = new URL(normalizedUrl);
      ogImage = new URL(ogImage, baseUrl.origin).href;
    }

    let favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      $('link[rel="apple-touch-icon"]').attr("href") ||
      "/favicon.ico";

    if (favicon && !favicon.startsWith("http")) {
      const baseUrl = new URL(normalizedUrl);
      favicon = new URL(favicon, baseUrl.origin).href;
    }

    const ogTags = {};
    $('meta[property^="og:"]').each((i, element) => {
      const property = $(element).attr("property");
      const content = $(element).attr("content");
      if (property && content) {
        ogTags[property] = content;
      }
    });

    const twitterTags = {};
    $('meta[name^="twitter:"]').each((i, element) => {
      const name = $(element).attr("name");
      const content = $(element).attr("content");
      if (name && content) {
        twitterTags[name] = content;
      }
    });

    const responseHeaders = {
      "content-type": response.headers["content-type"],
      "content-length": response.headers["content-length"],
      server: response.headers["server"],
      "last-modified": response.headers["last-modified"],
      "cache-control": response.headers["cache-control"],
    };

    Object.keys(responseHeaders).forEach((key) => {
      if (responseHeaders[key] === undefined) {
        delete responseHeaders[key];
      }
    });

    const metadata = {
      url: response.request.res.responseUrl || normalizedUrl,
      title,
      description,
      ogImage,
      favicon,
      httpStatus: response.status,
      responseHeaders,
      ogTags,
      twitterTags,
      fetchedAt: new Date().toISOString(),
    };

    return Response.json(metadata);
  } catch (error) {
    console.error("Error fetching metadata:", error.message);

    let errorMessage = "Failed to fetch metadata";
    let statusCode = 500;

    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      errorMessage = "Website not found or unreachable";
      statusCode = 404;
    } else if (error.response) {
      errorMessage = `HTTP ${error.response.status}: ${error.response.statusText}`;
      statusCode = error.response.status;
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Request timeout - website took too long to respond";
      statusCode = 408;
    }

    return Response.json(
      {
        error: errorMessage,
        details: error.message,
      },
      { status: statusCode }
    );
  }
}
