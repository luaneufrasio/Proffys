const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
  ];
  
  const weekdays = [
  "Domingo",
  "Segunda-feira",
  "terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  ]
  // Funcionalidades
  
  function getSubject(subjectNumber) {
      const position = +subjectNumber -1
      return subjects[position]
  }

  function convertHoursToMinutes(time) {
      const [hour, minutes] = time.split(":")
      return (Number(hour) * 60) + Number(minutes)
  }

  module.exports = {
      subjects,
      weekdays,
      getSubject,
      convertHoursToMinutes
  }