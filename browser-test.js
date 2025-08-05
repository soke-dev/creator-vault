// Browser console test for PocketBase image storage
// Run this in the browser developer console on localhost:3001

async function testImageProxy() {
  console.log('🧪 Testing Image Proxy API...');
  
  // Test with a Camp Origin URL
  const campOriginUrl = 'https://camp-origin.s3.us-east-2.amazonaws.com/1754225405067_Screenshot%25202025-08-03%25201344.png%3FAmz-Algorithm%3DAWS4-HMAC-SHA256%26Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26Amz-Credential%3DASIARSSFNKFZXNOGSSMG%252F20250805%252Fus-east-2%252Fs3%252Faws4_request%26Amz-Date%3D20250805T081241Z%26Amz-Expires%3D86400%26Amz-Security-Token%3DIQoJb3JpZ2luX2VjEDEaCXVzLWVhc3QtMiJHMEUCIQC9dKQAroMMT%2542NzIZODU4QQgZtF6D6n66qTOONYoq1wKvoCFkQAr6%250vN8VuEYOwmbvs';
  
  try {
    console.log('Testing image proxy with Camp Origin URL...');
    const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(campOriginUrl)}`;
    console.log('Proxy URL:', proxyUrl);
    
    const response = await fetch(proxyUrl);
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    console.log('Content-Type:', response.headers.get('content-type'));
    
    if (response.ok) {
      const blob = await response.blob();
      console.log('✅ Image proxy successful!');
      console.log('Blob size:', blob.size, 'bytes');
      console.log('Blob type:', blob.type);
      
      // Create an image element to test if it displays
      const img = document.createElement('img');
      img.src = URL.createObjectURL(blob);
      img.style.maxWidth = '200px';
      img.style.border = '2px solid green';
      document.body.appendChild(img);
      console.log('✅ Test image added to page');
      
    } else {
      const errorText = await response.text();
      console.error('❌ Image proxy failed:', response.status, errorText);
    }
    
  } catch (error) {
    console.error('❌ Image proxy test failed:', error);
  }
}

async function testDirectImageFetch() {
  console.log('🧪 Testing Direct Image Fetch...');
  
  const testImageUrl = 'https://via.placeholder.com/400x240/00FF00/FFFFFF?text=Direct+Test';
  
  try {
    const response = await fetch(testImageUrl);
    console.log('Direct fetch status:', response.status);
    
    if (response.ok) {
      const blob = await response.blob();
      console.log('✅ Direct fetch successful!');
      console.log('Blob size:', blob.size, 'bytes');
      
      // Create test image
      const img = document.createElement('img');
      img.src = URL.createObjectURL(blob);
      img.style.maxWidth = '200px';
      img.style.border = '2px solid blue';
      document.body.appendChild(img);
      console.log('✅ Direct test image added to page');
    }
    
  } catch (error) {
    console.error('❌ Direct fetch failed:', error);
  }
}

// Run tests
console.log('🚀 Starting browser tests...');
testImageProxy();
testDirectImageFetch();

console.log(`
📋 To test campaign creation:
1. Go to your wallet dashboard
2. Click "Create Campaign" 
3. Select an image from Camp Origin
4. Watch the browser console for detailed logs
5. Check if the campaign displays the image correctly

The enhanced system should now:
✅ Use image proxy for Camp Origin URLs  
✅ Provide detailed logging
✅ Fall back gracefully if needed
✅ Store both file and URL references
`);
