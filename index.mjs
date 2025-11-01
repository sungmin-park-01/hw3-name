import express from 'express';
import { faker } from '@faker-js/faker';

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// let randomName = faker.person.fullName(); 

app.get('/', (req, res) => {
   res.render('home.ejs');
});

app.get('/searchName', async(req, res) => {
   let name = req.query.name;
   let url = `https://www.behindthename.com/api/lookup.json?name=${name}&key=sm950510888`;
   let response = await fetch(url);
   
   let url2 = `https://www.behindthename.com/api/related.json?name=${name}&usage=eng&key=sm950510888`
   let response2 = await fetch(url2);

   let data = await response.json();
   let data2 = await response2.json();

   console.log(data2);

   res.render('searchName.ejs', { data: data, data2: data2 });
});

app.get('/randomPerson', (req, res) => {
   res.render('randomperson.ejs')
});

app.get('/rPResults', (req, res) => {
   let randomName = faker.person.fullName(); 
   let city = faker.location.city();
   let email = faker.internet.email();
   let country = faker.location.country();
   let address = faker.location.streetAddress();
   let phone = faker.phone.number();
   let company = faker.company.name();

   console.log(randomName);
   res.render('rPResults.ejs', { randomName, city, email, country, address, phone, company });
});

app.listen(3000, () => {
   console.log('server started');
});