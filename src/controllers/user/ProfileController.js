import profileUserModel from "../../models/profileUserModel.js";
import AccountController from "../AccountController.js";
import courseModel from "../../models/courseModel.js";
class uProfileController {
  // GET categories list
  async index(req, res) {
    const [profiles] = await profileUserModel.getById(res.locals.lcAuthUser.id);
    const lesson_learned = await profileUserModel.getLessonLearning(
      res.locals.lcAuthUser.id
    );
    // console.log("BARRRRRRRRRRRRRRRRRRRRRR")
    // console.log(lesson_learned)
    const lesson_love = await profileUserModel.getWatchList(
      res.locals.lcAuthUser.id
    );
    res.render("profile", {
      profiles,
      lesson_learned,
      lesson_love,
    });
  }
  async getLearning(req, res) {
    const learning = await profileUserModel.getLessonLearning(
      res.locals.lcAuthUser.id
    );
    for (let i = 0; i < learning.length; i++) {
      const rated = await courseModel.getAvgRate(learning[i].id);
      learning[i].rated = (+rated).toFixed(1);
    }
    res.render("learningCourses", {
      learning,
    });
  }
}
export default new uProfileController();
