/* SantaModel assists santa's helpers in packing children's requests.
 * It provides quality control by checking if the requests are being
 * fulfilled
 */

var temp = "<li>OPT</li>";

$(document).ready(function(){
    Controller.init();
});

var SantaModel = {
  
  /* Initializes the model with a list of requests, 
   * and sets the first one as the current one 
   */
   init : function(list){
       this.collection = requests;
       this.points = 0;
       this.current = 0;
   },
  
   /* It moves "current" to the next request */
   next : function (){
       this.current = this.current ++;
       if (this.current == this.collection.length){
           Controller.showResult();
       }else{
           Controller.NextReq();
       }
   },
  
   /* Returns the current request. 
    * If all requests have been processed (there is no current one), it returns null 
    */
   getCurrentRequest : function () {
       return SantaModel.collection[this.current];
   },  
    
   /* Packs the given item if it fulfills the current request.       
    * returns 1 if the given item fulfills the request (= answer)
    * returns 0 if the given item does not fulfill the request
    */
   pack : function(item) {
       if (item == SantaModel.collection[this.current].answer){
           return 1;
       }else{
           return 0;
       }
   },
    
   addPoints : function(ans){
       var value = this.pack(ans);
       this.points = this.points + value;
   }
  
};

var Controller = {
    init : function(){
        SantaModel.init();
        View.init();
    },
    GetRequest : function (){
        var request;
        request = SantaModel.getCurrentRequest();
        return request;
    },
    GetCurrent : function (){
        return SantaModel.current;
    },
    GetPoints : function (){
        return SantaModel.points;
    },
    
    SetPoints : function(ans){
        SantaModel.addPoints(ans);
    },
    CallNext : function(){
        SantaModel.next();
    },
    NextReq : function(){
        View.init();
    },
    showResult : function(){
        View.result();
    }
};

var View = {
    init : function(){
        $(".question").empty();
        $(".question-items").empty();
        $(".result").empty();
        var req;
        var opt;
        var ans;
        
        req = Controller.GetRequest();
        $(".question").append(req.question);
        for (var i = 0; i<req.options.length; i++){
            opt = temp.replace("OPT", req.options[i]);
            $(".question-items").append(opt);
        }
        $(".question-items li").click(function(){
            ans = $(".question-items li").text();
            Controller.SetPoints(ans);
            Controller.CallNext();
        })
    },
    result : function(){
        $(".question").empty();
        $(".question-items").empty();
        $(".result").empty();
        
        $(".result").html("Total points: "+Controller.GetPoints());
    }
};

