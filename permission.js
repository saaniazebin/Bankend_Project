let permission=[
    {
        role:"student",
        permission:["caneditownprofile","candeleteownprofile","canupdateownprofile"]
    },
    {
        role:"teacher",
        permission:["caneditresult","candeleteresult","canupdateresult"]
    },
    {
        role:"management",
        permission:["all"]
    }
]
module.exports=permission