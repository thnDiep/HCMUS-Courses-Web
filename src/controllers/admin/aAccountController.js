import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import accountModel from "../../models/accountModel.js";
import sendMail from "../../utils/email.js";
import courseModel from "../../models/courseModel.js";

const getUser = async (id) => {
  let users;
  let isActive;
  if (id === 2) {
    users = await userModel.getAllStudent();
    isActive = 2;
  } else if (id === 3) {
    users = await userModel.getAllTeacher();
    isActive = 3;
  } else {
    users = await userModel.getAllStudentAndTeacher();
    isActive = 1;
  }
  for (const user of users) {
    if (user.permissionID === 3) {
      user.sumCourse = await userModel.getNumberCourseOfTeacher(user.id);
    }
    // if (user.permissionID === 2) {
    //   user.sumCourseStudent = await userModel.getNumberCourseOfStudent(user.id);
    // }
    // else {
    //   user.sumCourse = 0;
    // }
  }
  return [isActive, users];
};
class AAccountController {
  async index(req, res) {
    const id = parseInt(req.query.id) || 1;

    const user = await getUser(id);
    const isActive = user[0];
    const users = user[1];
    const isAccount = true;
    res.render("vwAdmin/accounts", {
      isActive,
      isAccount,
      users,
      layout: "admin",
    });
  }

  async add(req, res) {
    const isAccount = true;

    res.render("vwAdmin/accounts/addTeacher", {
      layout: "admin",
      isAccount,
    });
  }
  async addTeacher(req, res) {
    const randomPassword = Math.random().toString(36).slice(-8);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(randomPassword, salt);
    const teacher = {
      name: req.body.name,
      password: hash,
      email: req.body.email,
      permissionID: 3,
      img: "/images/teacherPicture/teacher.jpg",
      isActive: 1,
    };
    let err_message_name, err_message_email;
    const check = (name, chec) => {
      if (name === chec) {
        err_message_name = `${name} was exist...`;
        return 0;
      }
      return 1;
    };
    const check1 = (name, chec) => {
      if (name === chec) {
        err_message_email = `${name} was exist...`;
        return 0;
      }
      return 1;
    };
    const nameTeacher = await accountModel.findByUsername(req.body.name);
    const emailTeacher = await accountModel.findByEmail(req.body.email);
    if (
      check(nameTeacher?.name, teacher.name) === 1 &&
      check1(emailTeacher?.email, teacher.email) === 1
    ) {
      sendMail(
        req.body.email,
        `SEND ACCOUNT TEACHER`,
        `<div><strong>username:${req.body.name}</strong></div>
       <div><strong>password:${randomPassword}</strong></div>`
      );
      // emailSend.then(async (val) => {
      //   console.log('Email sent')

      // })
      await accountModel.add(teacher);
      return res.redirect("/admin/listAccount");
    } else {
      const isAccount = true;
      return res.render("vwAdmin/accounts/addTeacher", {
        layout: "admin",
        isAccount,
        err_message_name,
        err_message_email,
      });
    }
  }
  async edit(req, res) {
    let idUser = req.query.id;
    const user1 = await accountModel.findById(idUser);

    const user = {
      id: req.query.id,
      name: req.body.name,
      email: req.body.email,
    };
    let err_message_name, err_message_email;
    const check = (name, chec) => {
      if (name === chec) {
        err_message_name = `${name} was exist...`;
        return 0;
      }
      return 1;
    };
    const check1 = (name, chec) => {
      if (name === chec) {
        err_message_email = `${name} was exist...`;
        return 0;
      }
      return 1;
    };

    // tìm name và email có tồn tại k
    const name = await accountModel.findByUsername(req.body.name);
    const email = await accountModel.findByEmail(req.body.email);
    if (
      (check(name?.name, user.name) === 1 || user1.name === user.name) &&
      (check1(email?.email, user.email) === 1 || user1.email === user.email)
    ) {
      await accountModel.update(user);
      return res.redirect("back");
    } else {
      user1.email === user.email
        ? (err_message_email = "")
        : (err_message_email = err_message_email);
      user1.name === user.name
        ? (err_message_name = "")
        : (err_message_name = err_message_name);
      const id = req.body.id || 1;
      const user = await getUser(id);
      const isActive = user[0];
      const users = user[1];
      const isAccount = true;
      return res.render("vwAdmin/accounts/index", {
        layout: "admin",
        isAccount,
        users,
        isActive,
        idUser,
        email1: req.body.email,
        name1: req.body.name,
        err_message_name,
        err_message_email,
      });
    }
  }

  async delete(req, res) {
    await userModel.delete(req.query.id);
    await courseModel.deleteCourseOfStudent(req.query.id);
    await courseModel.deleteCourseOfTeacher(req.query.id);
    res.redirect("back");
  }
  async deleteByCheckbox(req, res) {
    if (Array.isArray(req.body.idAccounts)) {
      for (const idAccounts of req.body.idAccounts) {
        await userModel.delete(idAccounts);
        await courseModel.deleteCourseOfStudent(idAccounts);
        await courseModel.deleteCourseOfTeacher(idAccounts);
      }
    } else {
      await userModel.delete(req.body.idAccounts);
      await courseModel.deleteCourseOfStudent(req.body.idAccounts);
      await courseModel.deleteCourseOfTeacher(req.body.idAccounts);
    }
    res.redirect("back");
  }

  async active1(req, res) {
    const user = {
      id: req.query.id,
      isActive: 1,
    };
    await accountModel.updateActive(user);
    res.redirect("back");
  }
  async active0(req, res) {
    console.log("fgsdfsdfsd");
    console.log(req.query.id);
    const user = {
      id: req.query.id,
      isActive: 0,
    };
    await accountModel.updateActive(user);
    res.redirect("back");
  }
}

export default new AAccountController();
