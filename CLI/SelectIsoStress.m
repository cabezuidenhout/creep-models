correctTolerance = false;
tolerance = 0;

while( !correctTolerance )
  tolerance = input("Enter iso-stress tolerance (MPa) : ");
  
  if( isempty(tolerance) ) 
    printf("! No selection made\n");
  else
    tolerance = abs(tolerance);
    isoStress = GetIsoStress(creepData, tolerance);
    DisplayIsoStress(isoStress);
    printf("- Displaying iso-stress data in web browser\n");
    correctTolerance = YoN("Do you want to use these iso-stress lines?");
  end
end
