const mongoose = require('mongoose');
const url = 'mongodb+srv://luongngocvu:LuongNgocVu@tmcluster-an88r.mongodb.net/websitegiasu';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB successfully connected")).catch(err => console.log(err));
mongoose.set('useCreateIndex', true);
