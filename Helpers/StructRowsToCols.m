function r = StructRowsToCols( a )

  if( isstruct(a) )
    r = structfun( @StructRowsToCols, a,"UniformOutput", false);
  else
    r = ToColumnVector(a);
  end
endfunction