
import express from 'express';

import path from 'path';

import {knex} from '../Database/Access'

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded());


const national = async (req: any , res: any) =>{
    interface nation {
        forename: string,
        surname: string,
        driverId?: number
        Vitorias: number

    }
    try {
        
        
        const query1 = await knex
        .select()
        .table('drivers')
        .innerJoin('results', 'drivers.driverId', 'results.driverId')
        .where({nationality: 'brazilian', position: 1 })
        
        const  driverName: nation = query1.filter(function(item: any){
            if(item.surname == "Senna" || 'Piquet' || 'Pace' || "Massa" || 'Barrichello' || 'Fittipaldi' )
            return {
                forename:item.forename,
                surname: item.surname,
                
            }     
        
        })
        const uniqueDrivers : any = [...new Map(query1.map((item: { surname: any; }) => [item.surname, item])).values()]
        console.log(uniqueDrivers)
        const vit : any = Object.getOwnPropertyNames(driverName)     
        const vit1 = vit.length
     
            
        console.log(uniqueDrivers)
        res.render("index",{uniqueDrivers: uniqueDrivers, vit1:vit1})


    } catch (error){
        console.log(error)
    }
}

const findingDriver = (req: any,res : any)=>{
    interface dr {
        Driver: string} 
    let dr = req.body
   
    knex
    .select()
    .table("drivers")
    .where({forename : dr.Driver})
    .then((data: any)  => {
        const result: object = data
        res.send(result)
    }).catch((err: any)  =>{
        console.log(err);
    })
    
}


const winners = async ( req:any , res: any) =>{
    interface winner {
        Racename: string,
        Date: Date,
        Grid: number,
        Laps: string
    }

        
    const driver: any = req.body
    
    try{

        const id : any =  await knex.
        select().
        table('drivers').
        where({surname: driver.Driver})
     
        
        
        
        const query: any = await knex.
        select().
        table('results').
        innerJoin('races', 'results.raceId' , 'races.raceId').
       
        where({driverId: id[0].driverId, position: '1'}).
        orderBy('races.date')

 
        const query3 : winner = 
            query.map(function(item: any){
                return {
                Racename: item.name,
                Date: item.date,
                Grid: item.grid,
                Laps: item.laps
                }
        })

    
                      

        const winsTotal: number = query.length
        res.render('wins' ,{query3:query3, id:id, winsTotal:winsTotal})
        res.status('index', {query3: query3 , id:id, winsTotal})

    } catch (error){
        console.log(error)
    }
    
}
export {router , findingDriver, national, winners};
