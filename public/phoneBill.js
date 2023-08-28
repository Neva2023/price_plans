document.addEventListener('alpine:init', () => {
    
    Alpine.data('phoneBills', () => {
     
        return {
            version: 'api-1.0',
            total :0,
            price_plan: '',
            actions : '',
            price_plans: [],
            message : '',
            call_price1: 0,
            sms_price1: 0,
            plan_name: '',
            price_plan1:'',

            init () {
        
                       
                axios 
                .get('/api/price_plans')
                .then((result)=>{
                    this.price_plans = result.data.price_plans
                    console.log(this.price_plans)
                })},

            

                      get ()  { axios
                          .post('/api/phonebill', {
                              // Data to be sent to the server
                              price_plan: this.price_plan,
                              actions: this.actions,
                            
                          })
                          .then(response => {
                            this.total = response.data.total

                              console.log(total);
                          })
                          .catch(function (error) {
                              console.error(error);
                              
                          });
                        },


                        add ()  { axios
                            .post('/api/price_plan/create', {
                                // Data to be sent to the server
                                price_plan1: this.price_plan1,
                                call_price1: this.call_price1,
                                sms_price1: this.sms_price1,
                              
                            })
                            .then(response => {
                              this.price_plans = response.data.price_plans
  
                                console.log(this.price_plans);
                            })
                            .catch(function (error) {
                                console.error(error);
                                
                            });
                          },   

                
                            del()  { axios
                            .post('/api/price_plan/delete', {
                                
                                plan_name: this.plan_name
                                
                              
                            })
                            .then(response => {
                              this.price_plans = response.data.price_plans
  
                                console.log(this.price_plans);
                            })
                            .catch(function (error) {
                                console.error(error);
                                
                            });
                          },   

                    // get ()  { axios
                    //     .post('/api/phonebill', {
                    //         // Data to be sent to the server
                    //         price_plan: this.price_plan,
                    //         actions: this.actions,
                          
                    //     })
                    //     .then(result => {
                    //         if (result.data.error) {
                    //             this.message=result.data.msg
                    //         } else {
                    //             this.total = result.data.total
                    //         }
                    //     })
                        
                    //   }
                        


                
                
      
        }

})

})