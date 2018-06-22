% Copyright © 2018 CA Bezuidenhout
% This file is part of Creep Models.
%
% Creep Models is free software: you can redistribute it and/or modify
% it under the terms of the GNU General Public License as published by
% the Free Software Foundation, either version 3 of the License, or
% (at your option) any later version.
%
% Creep Models is distributed in the hope that it will be useful,
% but WITHOUT ANY WARRANTY; without even the implied warranty of
% MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
% GNU General Public License for more details.
%
% You should have received a copy of the GNU General Public License
% along with Creep Models.  If not, see <http://www.gnu.org/licenses/>.
%=====================================================================
function testResult = StressTestMansonHaferd( mhModel, creepData)
  testResult.stressActual = creepData.stress;
  testResult.stressPredicted = zeros( size(creepData.stress) );
  testResult.tr = creepData.tr;
  testResult.T = creepData.T;

  for( c=1:length(testResult.tr) ) 
    for( r=1:length(testResult.T) )
      expectedAwnser = testResult.stressActual(r,c);

      if( expectedAwnser != 0 )
        tr = testResult.tr(c);
        T = testResult.T(r);

        pMH = ( log10( tr ) - mhModel.logta ) / ( ConvTemp(T,'c','k') - mhModel.Ta );
        pMHmc = fliplr( mhModel.masterCurve.coefficients' );
        pMHmc( length(pMHmc) ) = pMHmc( length(pMHmc) ) - pMH;
            
        awnsers = roots(pMHmc);
        closestAwnser = 0;
        smallestError = Inf;      

        for( i=1:length(awnsers) ) 
          currentAwnser = 10^awnsers(i);
          currentAwnser = real(currentAwnser);
          currentError = abs(expectedAwnser-currentAwnser);

          if( currentError < smallestError )
            smallestError = currentError;
            closestAwnser = currentAwnser;
          end
        end
        
        testResult.stressPredicted(r,c) = closestAwnser;    
      end    
    end
  end

  testResult.errors = Errors( testResult.stressPredicted, testResult.stressActual );
endfunction
