import { Request, Response } from "express";

class UserController {
  static async getUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await prisma?.user.findUnique({
        where: {
          id: id
        }
      });

      return res.status(200).json({
        message: "User Info Fetched Successfully",
        user
      })
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch the User"
      })
    }
  }
}

export default UserController;