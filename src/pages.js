const Database = require("./database/db");
const {
  subjects,
  weekdays,
  getSubject,
  convertHoursToMinutes,
} = require("./utils/format");

function pageLanding(req, res) {
  return res.render("index.html");
}

async function pageStudy(req, res) {
  const filters = req.query;

  if (!filters.subject || !filters.weekday || !filters.time) {
    return res.render("study.html", { filters, subjects, weekdays });
  }

  //converter horas em minutos
  const timeToMinutes = convertHoursToMinutes(filters.time);

  const query = `
  SELECT classes.*, proffys.*
  FROM proffys
  JOIN classes ON (classes.proffy_id = proffys.id) 
  WHERE EXISTS (
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = classes.id
    AND class_schedule.weekday = ${filters.weekday}
    AND class_schedule.time_from <= ${timeToMinutes}
    AND class_schedule.time_to > ${timeToMinutes}
  )
  AND classes.subject = '${getSubject(filters.subject)}'
  `;
  //caso haja erro na hora da consulta do banco de dados.

  try {
    const db = await Database;
    const proffys = await db.all(query);

    //   "SELECT * FROM proffys JOIN classes WHERE proffys.id = classes.proffy_id"
    // );
    return res.render("study.html", { proffys, filters, subjects, weekdays });
  } catch (error) {
    return res.render("study.html", { proffys, filters, subjects, weekdays });
   }
}

function pageGiveClasses(req, res) {
  
 //se não, mostrar página
  return res.render("give-classes.html", { subjects, weekdays });
}

async function saveClasses(req, res) {
  const createProffy = require ('./database/createProffy')
  
  console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
  const proffyValue = {
    name: req.body.name,
    avatar: req.body.avatar,
    whatsapp: req.body.whatsapp,
    bio: req.body.bio
  }
  const classValue = {
    subject: getSubject(req.body.subject),
    cost: req.body.cost
  }

  const classScheduleValues = req.body.weekday.map(
    (weekday, index) => {
      return {
        weekday,
        time_from: convertHoursToMinutes(req.body.time_from[index]),
        time_to: convertHoursToMinutes(req.body.time_to[index])
      }
  })

    try {
      const db = await Database
    await createProffy(db, {proffyValue, classValue, classScheduleValues })

    let queryString = "?subject=" + req.body.subject
    queryString += "&weekday=" + req.body.weekday[0]
    queryString += "&time=" + req.body.time_from[0]
      
    return res.redirect("/study" + queryString);
    } catch (error) {
      console.log(error)
    }

     
}

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses
};
