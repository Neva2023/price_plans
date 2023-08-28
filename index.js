import express from 'express';
import totalPhoneBill from './totalPhoneBill.js';
import { addPriceplan, deletePlan, getPlans, getSpecificPlan } from './code.sql.js';
import { updatePlan } from './code.sql.js';


const app = express();
app.use(express.static('public'))
app.use(express.json())

 app.post('/api/phonebill' ,async function (req, res){
     const price_plan = req.body.price_plan
     const actions = req.body.actions
     

if (!price_plan) {
    res.json({
        error: `Invalid price plan name : ${price_plan}`
    });
    } else{

        const SpecificPlan = await getSpecificPlan(price_plan)
        const sms_price= SpecificPlan.sms_price
        const call_price= SpecificPlan.call_price
        const total=totalPhoneBill(actions, sms_price, call_price);

        res.json({
            total
        });

    }
})

// app.post('/api/phonebill' ,async function (req, res){
//     const price_plan = req.body.price_plan
//     const actions = req.body.actions


// co
//     let msg= ''
//     let total = ''
//     try {
    
//     const SpecificPlan = await getSpecificPlan(price_plan)
//     const sms_price= SpecificPlan.sms_price
//     const call_price= SpecificPlan.call_price
//     msg = "Success"
//      total=totalPhoneBill(actions, sms_price, call_price)
//     } catch(err) {
//      msg = 'price plan invalid'
    
//     }
//     res.json({
        
//         total,
//         msg,
    
//     })
// } )

//const nn = await getSpecificPlan('frist_plan')
//console.log(nn)



app.get('/api/price_plans', async function (req, res){
    const price_plans = await getPlans()


res.json ({
   price_plans 
})
});


app.post('/api/price_plan/create', async function (req, res) {
    const price_plan1 = req.body.price_plan1
    const call_price1 = req.body.call_price1
    const sms_price1 = req.body.sms_price1
    

   await addPriceplan( price_plan1, call_price1, sms_price1)
   const price_plans = await getPlans()

 
    
 res.json ({

    price_plans,
     status : 'success'
 })
});


app.post('/api/price_plan/delete', async function (req, res) {
    const plan_name = req.body.plan_name
    

   await deletePlan(plan_name)
   const price_plans = await getPlans()

 
    
 res.json ({

    price_plans,
     status : 'success'
 })
});


 





app.post('/api/price_plans/update', async function (req, res){
    const price_plan1 = req.body.price_plan1

    const sms_price1= req.body.sms_price1
    const call_price1= req.body.call_price1
    const price_plans_update = await updatePlan(price_plan1, sms_price1, call_price1)



res.json ({
   price_plans_update
})
});

// const result2 = await updatePlan('frist_plan', 0.9, 0.9)
// console.log(result2)



// app.post('/api/price_plan/update', async function(req, res){
    
//     const { sms_price,
//             call_price,
//             plan_name} = req.body;

//    const result = await db.run(`update price_plan set sms_price = ?,
//                                     call_price= ? where plan_name = ?`,
//    sms_price,
//    call_price,
//    plan_name);

//    console.log(result)

//    res.json({
//        result,
//        status: 'success'
//    })

// });





const PORT = process.env.PORT || 4011;
app.listen(PORT, () => `Server started ${PORT}`)