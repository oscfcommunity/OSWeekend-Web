const Admin = require("../Models/Admin");
const Team = require("../Models/Team");

exports.AddTeamMember = async (req, res) => {
  const adminId = req.user._id;

  try {
    // Assuming 'req.body' contains the necessary data including image file
    const { name, bio, post, social_links, pics, team } = req.body;

    // Assuming 'req.fileUrl' contains the URL of the uploaded image

    if (!name || !bio || !post || !social_links || !pics) {
      return res.status(400).json({
        success: false,
        message: "All details are required to add a team member !!!",
      });
    }

    const newTeamMember = new Team({
      name,
      bio,
      post,
      team,
      social_links,
      pic: pics, // Saving the image URL
      added_by: adminId,
    });

    await newTeamMember.save();

    return res.status(200).send({
      success: true,
      team_member: newTeamMember,
      message: "Team Member Added Successfully",
    });
  } catch (error) {
    console.error("Error in adding a team member:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while adding a team member.",
    });
  }
};

exports.getallTeamMembers = async (req, res) => {
  try {
    const teams = await Team.find(
      {},
      {
        _id: 1,
        name: 1,
        post: 1,
        social_links: 1,
        pic: 1,
      }
    );
    return res.status(200).send({ success: true, teams });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getmemberDetails = async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await Team.findById(memberId);
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const responseData = {
      name: member.name,
      bio: member.bio,
      post: member.post,
      team: member.team,
      social_links: member.social_links,
      pic: member.pic,
    };
    res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const userType = req.userType;
    if (userType !== "admin") {
      return res
        .status(403)
        .send({ success: false, message: "Not Authorized." });
    }
    const _id = req.params.id;
    const team = await Team.findOne({ _id });
    if (!team) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found." });
    }
    const result = await Team.findByIdAndDelete(_id);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete team." });
    }
    return res.status(200).send({ success: true, message: "Team Deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.UpdateTeam = async (req, res) => {
  const Id = req.user._id;
  try {
    const teammemberId = req.params.id;
    const { name, bio, post, social_links, pics, team } = req.body;

    let teams;
    if (req.userType === "admin") {
      teams = await Team.findById(teammemberId);
    } else {
      return res
        .status(401)
        .send({ success: false, message: "Not Authorized." });
    }
    if (name !== teams.name) {
      teams.name = name;
    }

    if (bio !== teams.bio) {
      teams.bio = bio;
    }

    if (post !== teams.post) {
      teams.post = post;
    }

    if (social_links !== teams.social_links) {
      teams.social_links = social_links;
    }

    if (pics !== teams.pic) {
      teams.pic = pics;
    }
    if (team !== teams.team) {
      teams.team = team;
    }
    teams.updated_by = Id;
    const updatedTeam = await teams.save();
    return res.status(200).json({ success: true, updatedTeam });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error.", error });
  }
};
