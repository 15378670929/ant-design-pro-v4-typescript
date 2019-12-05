import { Request, Response } from 'express';

export default {
  'POST /api/login1/account': (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    console.log(req.body)
    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  }
}