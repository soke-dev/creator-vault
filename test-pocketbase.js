// Simple test script to verify PocketBase image storage functionality
// Note: This is a Node.js script to test the PocketBase functionality

async function testImageStorage() {
  devLog('🧪 Testing PocketBase Image Storage...\n');
  
  // Import PocketBase client
  const PocketBase = require('pocketbase');
  const pb = new PocketBase('https://fairytale-web.pockethost.io');
  
  // Test connection
  try {
    devLog('1. Testing PocketBase connection...');
    await pb.health.check();
    devLog('✅ PocketBase connection successful\n');
  } catch (error) {
    console.error('❌ PocketBase connection failed:', error.message);
    return;
  }
  
  // Test image creation with URL
  const testData = {
    campaign_address: 'test_campaign_' + Date.now(),
    creator_address: 'test_creator_' + Date.now(),
    original_nft_id: 'test_nft_123'
  };
  
  const testImageUrl = 'https://via.placeholder.com/400x240/0000FF/FFFFFF?text=Test+Image';
  
  try {
    devLog('2. Testing image storage with URL...');
    devLog('Campaign Address:', testData.campaign_address);
    devLog('Image URL:', testImageUrl);
    
    const result = await campaignImageService.createWithImageFile(testData, testImageUrl);
    devLog('✅ Image storage successful!');
    devLog('Record ID:', result.id);
    devLog('Has File:', !!result.image_file);
    devLog('Has URL:', !!result.image_url);
    
    // Test retrieval
    devLog('\n3. Testing image retrieval...');
    const retrieved = await campaignImageService.getByCampaignAddress(testData.campaign_address);
    if (retrieved) {
      devLog('✅ Image retrieval successful!');
      devLog('Retrieved Record ID:', retrieved.id);
      devLog('File Available:', !!retrieved.image_file);
      devLog('URL Available:', !!retrieved.image_url);
      
      if (retrieved.image_file) {
        const fileUrl = campaignImageService.getFileUrl(retrieved);
        devLog('Generated File URL:', fileUrl);
      }
    } else {
      devLog('❌ No image found for retrieval test');
    }
    
  } catch (error) {
    console.error('❌ Image storage test failed:', error.message);
    console.error('Full error:', error);
  }
}

// Run the test
testImageStorage().then(() => {
  devLog('\n🎯 Test completed!');
  process.exit(0);
}).catch(error => {
  console.error('\n💥 Test failed with error:', error);
  process.exit(1);
});
