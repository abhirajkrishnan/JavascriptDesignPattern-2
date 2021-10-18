function getRandom() {
  return (Math.random()*2 >= 1);
}

const model = {
  studentNames: [...document.querySelectorAll("tbody .name-col")].map(
    (e) => e.innerText
  ),
  attendance: {},
  
  init: function () {
    if (!localStorage.attendance) {
      model.studentNames.forEach((e) => {
        model.attendance[e] = [];
        for (let i = 0; i <= 11; i++) model.attendance[e].push((Math.random()*2 >= 1));
      });
                           
      // localStorage.attendance = JSON.stringify(model.attendance);
      localStorage.setItem("attendance",JSON.stringify(model.attendance))
    } 
    model.attendance =JSON.parse(localStorage.getItem("attendance"))
    console.log(model.attendance,"asdfdas")
  },
  localStorageattendance: function () {
    localStorage.setItem("attendance",JSON.stringify(model.attendance))
  }
};

// ---------------------------------------------------------

const controller = {
  init:function(){
    model.init();
    missedCol.init();
    view.init();
   
  },
  calculateDaysMissed: function (arr) {
    let count = 0;
    arr.forEach((i) => {
      if (i === false) count++;
    });
    return count;
  }
};

// ---------------------------------------------------------

const view = {
  init: function () {
    this.checkbox = [...document.querySelectorAll("tbody input")];
    this.students = [...document.querySelectorAll("tbody .student")];
    this.checkbox.forEach((item) => {
      item.addEventListener("click", view.render.bind(this));
    });
    this.render()
  },

  render: function () {
    this.students.forEach((item) => {
      let check = [...item.querySelectorAll(".attend-col input")].map(
        (e) => e.checked
      );
      let name = item.querySelectorAll(".name-col")[0].innerText;
      model.attendance[name] = check;
    });
    model.localStorageattendance();
    missedCol.render();
  }
};

// ----------------------------------------------

const missedCol = {
  init: function () {
    this.missed = [...document.querySelectorAll(".student .missed-col")];
    this.render();
  },
  render: function () {
    model.studentNames.forEach((item, index) => {
      this.studentAttendance = model.attendance[item];
       this.missedDays = controller.calculateDaysMissed(this.studentAttendance);
      this.missed[index].innerText = this.missedDays;
    });
  

  },
};



let miss = [...document.querySelectorAll(".student .missed-col")];

controller.init()

// model.init()