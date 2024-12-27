const mongoose = require('mongoose');
const Post = require('./models/postModels'); // Đảm bảo đường dẫn đúng tới model Post

mongoose.connect('mongodb+srv://PTUDW:se7AeECrLmX6FjwW@ptudw.7otyu.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Tìm các bài viết repost có originalPost là chuỗi "null"
    const invalidReposts = await Post.find({ originalPost: 'null' });

    if (invalidReposts.length > 0) {
      console.log(`Found ${invalidReposts.length} invalid reposts. Fixing...`);

      for (const repost of invalidReposts) {
        // Giả sử bạn muốn đặt originalPost bằng chính _id của repost nếu không có originalPost hợp lệ
        repost.originalPost = repost._id;
        await repost.save();
        console.log(`Fixed repost with ID: ${repost._id}`);
      }

      console.log('All invalid reposts have been fixed.');
    } else {
      console.log('No invalid reposts found.');
    }

    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
