// const multichain= require("multichain-node");
import  multichain from "multichain-node"

let host1 ='10.20.1.102';
// let host2 = '192.168.100.15';

let chain2_port = 4362;
let chain2_user = 'multichainrpc';
let chain2_pass = '5h8qzGQsxfHGwMoqBfoJdTt6Sv3FGNFwJNLkVjoAH3xG';

// Connect to multichain node

export const node = multichain({
  port : chain2_port,
  host : host1,
  user : chain2_user,
  pass : chain2_pass
});

export async function ChainInfo() {
  return new Promise((resolve, reject) => {
    node.getInfo( [],(err, res)=>{
      if(err){
        reject(err);
        console.log(err);
      }
      else{
        resolve(res);
      }
      });
  });
 }

// ChainInfo().then(function(result){
//   console.log(result);

// })





export function createStream(streamName){
//  create data stream with given name
  return new Promise((resolve, reject)=>{
    node.create( ['stream', streamName ,{'restrict':'write'}],(err, res)=>{
      if(err){
        reject(err['message']);
      }else{
        resolve(res);
      }
  
      });
  });
  
}
// let stream1_id = '16062718a3201e9b5987c88920f4086f82e6030d092f93a57555e54fbc5adb76'

// createStream('dataStream2')



export function liststreams(){
// fetch list of streams
  return new Promise((resolve, reject)=>{
    node.listStreams( [],(err, res)=>{
      if(err){
        reject(err);
        console.log(err);
      }else{
        resolve(res);
      }
      
  
      });
  })
  }
// liststreams().then(function(result){
//   console.log(result);
// })
// console.log('fetching stream info of stream created..')
// liststreams()
export function publish_to_stream(streamName, key, DataJson){

  return new Promise((resolve, reject)=>{
    node.publish([streamName, key, {'json':DataJson}],(err, res)=>{
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(res);
      }
    })
  });

}

export function subscribe_to_stream(streamName){
  return new Promise((resolve, reject)=>{

    node.subscribe([streamName],(err, res)=>{
      if(err){
        // console.log(err);
        reject(err);
      }
      // console.log(res);
    });
  });
  
}

// let streamData;
// subscribe_to_stream('dataStream2')
export async function getStreamitems(streamName){ 

  return new Promise((resolve, reject)=>{
    node.listStreamItems([streamName],(err, res)=>{
      if(err){
      //  console.log(err);
       reject(err);
     }
     else{
       resolve(res)
      }
  })
})
}
// publish_to_stream('employee1', 'email',{email: 'employee1@gmail.com'})
// subscribe_to_stream('employee1');
// getStreamitems('employee1').then(function(res){
//   console.log(res[1].data.json.email)
// }).catch(function(err){
//   console.log(err)
// })

async function Demo(){

  let streamName= 'datastream11'
  let info = await ChainInfo();
  console.log(info);

  let streamHash = await createStream(streamName).then(function(result){
    return (result);
  }).catch(function(err){
    return (err);
  });

  // console.log(streamHash)

  let streamLiseInfo = await liststreams();
  // .then(function(result){
  //   return(result);
  // })

  console.log(streamLiseInfo);

  let transactionId = await publish_to_stream(streamName, 'eval', {'marks' :'100'}).then(function(res){
    return res;
  }).catch(function(err){
    return err;
  })
// console.log(transactionId);

let subscribe = await subscribe_to_stream('s').catch(function(err){
  return err;
})

// console.log(subscribe)

let streamItems = await getStreamitems(streamName).then(function(res){
  return res;
}).catch(function(err){
  return err;
})
// console.log(streamItems)


}

// Demo();
// module.exports.node = node;
// module.exports.ChainInfo = ChainInfo;
// module.exports.createStream = createStream;
// module.exports.liststreams = liststreams;
// module.exports.publish_to_stream = publish_to_stream;
// module.exports.subscribe_to_stream = subscribe_to_stream;
// module.exports.getStreamitems = getStreamitems;
// export default createStream
// module.exports={
//   node, 
//   ChainInfo(){},
//   createStream(){},
//   liststreams(){},
//   publish_to_stream(){},
//   subscribe_to_stream(){},
//   getStreamitems(){}
// }

