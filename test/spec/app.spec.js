/* Remember that blanket will only work with brackets live preview */
/* Try to maximise the coverage of the SantaModel object */

describe("Santa", function() {

  it("SantaModel.init should work correctly", function() {  
    SantaModel.init();
      
    expect(SantaModel.collection).toEqual(requests);
    expect(SantaModel.points).toBe(0);
    expect(SantaModel.current).toBe(0);
  });    
 
  it("SantaModel.next should work correctly", function() {  
    SantaModel.next();
    var value1 = SantaModel.current;
    
    SantaModel.init(); 
    SantaModel.next();
    var value2 = SantaModel.current;
    
    expect(value1).toBe(null); //no init, so next should return an error
    expect(value2).toBe(1);
  });
  it("SantaModel.getCurrentRequest should work correctly", function() {  
    SantaModel.init(); 
    
    expect(SantaModel.getCurrentRequest()).toEqual(requests[0]);
    SantaModel.next(); //current = 1
    expect(SantaModel.getCurrentRequest()).toEqual(requests[SantaModel.current]);
    SantaModel.next(); //current = 2
    SantaModel.next(); //current = 3
    expect(SantaModel.getCurrentRequest()).toEqual(undefined);
  });    
 
  it("SantaModel.pack should work correctly", function() {  
    SantaModel.init(); 
    var ans = "yes";
    var value1 = SantaModel.pack(ans);
    ans = "hello";
    var value2 = SantaModel.pack(ans);
    ans = "no";
    var value3 = SantaModel.pack(ans);
    ans = 1;
    var value4 = SantaModel.pack(ans);
    ans = "No"; 
    var value5 = SantaModel.pack(ans);
      
    expect(value1).toBe(0);
    expect(value2).toBe(0); 
    expect(value3).toBe(1); 
    expect(value4).toBe(null); //error in input 
    expect(value5).toBe(0); //answers in requirements are "no" or "yes" and not "No" or "Yes"
  });
});
