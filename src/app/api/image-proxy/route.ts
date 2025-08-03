import { NextRequest, NextResponse } from 'next/server';

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    console.log(`[Image Proxy] Request received for URL: ${imageUrl}`);

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    // Validate URL format
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    console.log(`[Image Proxy] Fetching image: ${imageUrl}`);

    // Fetch the image with timeout and proper headers
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch(imageUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[Image Proxy] Failed to fetch image: ${response.status} ${response.statusText}`);
      
      // Try to get more error details
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`[Image Proxy] Error details: ${errorText}`);
      
      return NextResponse.json(
        { 
          error: `Failed to fetch image: ${response.status} ${response.statusText}`,
          details: errorText
        },
        { 
          status: response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    // Check if response is actually an image
    const contentType = response.headers.get('content-type') || '';
    console.log(`[Image Proxy] Content-Type: ${contentType}`);
    
    // Be more lenient with content type checking
    if (!contentType.startsWith('image/') && !contentType.includes('octet-stream')) {
      console.error(`[Image Proxy] Not an image: ${contentType}`);
      return NextResponse.json(
        { error: 'URL does not point to a valid image', contentType },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    console.log(`[Image Proxy] Successfully fetched image, size: ${imageBuffer.byteLength} bytes`);

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error: any) {
    console.error('[Image Proxy] Error:', error);
    
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout' },
        { 
          status: 408,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}
