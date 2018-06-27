function result = ToColumnVector( v )

  result = v;

  if( size(v,1) > 1 )
    if( size(v,2) == 1)
      result = v';
    end  
  end
end