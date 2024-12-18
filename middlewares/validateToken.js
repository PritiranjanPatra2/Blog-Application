import dotenv from 'dotenv';

dotenv.config();
const SECERET=process.env.JWT_PRIVATE;

function validateToken(req, res, next) {
    const token = req.header('Authorization');
    try {
        if(!token) {

            return res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    req.token=token;
    req.user=jwt.verify(token,SECERET);
    req.userId=req.user.userId;
    next();
}

export default validateToken;