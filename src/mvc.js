function getRandom() {
  return Math.random() * 2 >= 1;
}

const model = {
  studentNames: [...document.querySelectorAll("tbody .name-col")].map((e) => e.innerText),

  attendance: {},

  init: function () {
    if (!localStorage.attendance) {
      model.studentNames.forEach((e) => {
        model.attendance[e] = [];
        for (let i = 0; i <= 11; i++) model.attendance[e].push(getRandom());
      });

      localStorage.setItem("attendance", JSON.stringify(model.attendance));
      
    }
    model.attendance=JSON.parse(localStorage.getItem("attendance"))
    
  },
  
};

// ---------------------------------------------------------

const controller = {
  init: function () {
    model.init();
    missedCol.init();
    checkboxview.init();
  },
  calculateDaysMissed: function (arr) {
    let count = 0;
    arr.forEach((i) => {
      if (i === false) count++;
    });
    return count;
  },
  localStorageattendance: function () {
    localStorage.setItem("attendance", JSON.stringify(model.attendance));
  }
};

// ---------------------------------------------------------

const checkboxview = {
  init: function () {
    this.checkbox = [...document.querySelectorAll("tbody input")];
    this.students = [...document.querySelectorAll("tbody .student")];
    this.checkbox.forEach((item) => {
      item.addEventListener("click", checkboxview.update.bind(this));
    });
    this.render();
  },
  render:function(){
    this.studentvalues=[...document.querySelectorAll("tbody .student ")].map(e=>{
      return e.children
    })
    this.studentvalues.forEach(e=>{
      let name=e[0].innerText
      for(let i=1;i<=12;i++){
        // e[i].childNodes[0].checked=(Math.random() * 2 >= 1)
        e[i].childNodes[0].checked=model.attendance[name][i-1]
        // console.log("checkvalues",name,e[i].childNodes[0].checked,model.attendance[name][i-1])
      }
      // console.log(name,model.attendance[name]);
    })
    missedCol.render();
  }
,
  update: function () {
    this.students.forEach((item) => {
      
      let name = item.querySelectorAll(".name-col")[0].innerText;
      let arr=model.attendance[name];
      let check = [...item.querySelectorAll(".attend-col input")].map(
        (e) => e.checked
      );

      model.attendance[name] = check;
    });
    controller.localStorageattendance();
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
  }
};

controller.init();
