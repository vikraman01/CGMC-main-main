const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const app = express();
app.use(express.static('.'));
const upload = multer({ dest: 'tmp/' });

app.post('/add-staff', upload.single('photo'), (req, res) => {
  const { name, designation, reg, email, dept } = req.body;
  const photoName = req.file.originalname;
  const photoDest = path.join('assets/images/staff', photoName);

  fs.renameSync(req.file.path, photoDest);

  const deptPath = path.join(dept);
  const $ = cheerio.load(fs.readFileSync(deptPath, 'utf8'));
  const block = `
    <div class="col-4 col-lg-3">
      <div class="single-person">
        <div class="person-image">
          <img src="assets/images/staff/${photoName}" alt="${name}">
          <span class="icon"><img src="assets/images/cgmcico.png" alt="CGMC icon"></span>
        </div>
        <div class="person-info">
          <h3 class="full-name">${name}</h3>
          <span class="speciality"><b>Designation:</b> ${designation}</span><br>
          <span class="speciality"><b>TNMC Registration Number:</b> ${reg}</span><br>
          <span class="speciality"><b>Email:</b> ${email}</span><br>
        </div>
      </div>
    </div>`;
  $('.single-person').last().parent().append(block);
  fs.writeFileSync(deptPath, $.html());

  res.send('Staff added! Remember to commit and push the changes.');
});

app.listen(3000, () => console.log('Visit http://localhost:3000/admin_staff.html'));
