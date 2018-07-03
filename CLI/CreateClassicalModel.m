SelectIsoStress;

useAllData = !YoN("Fit the mastercurve to only iso-stress data?");

model = ClassicalModel( modelName, creepData, isoStress, useAllData);
DisplayClassicalModel(model, creepData);    
printf("- Displaying model in web browser\n");