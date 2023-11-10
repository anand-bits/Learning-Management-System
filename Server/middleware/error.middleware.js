const errorMiddleware= (err,res,next)=>
{
    err.statusCode= err.statusCode|| 500;
    err.message=err.message || "Something Error Comming"
    res.status().json(
        {
            success:false,
            message:err.message,
            stack:err.stack
        }
    )
}
export default errorMiddleware;