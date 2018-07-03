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
function isoStress = GetIsoStress( creepData, tolerance = 0)
  isoStress = struct;
  isoStress.material = creepData.material;
  isoStress.tolerance = tolerance;
  isoStress.stress = [];
  
  isoStress.m = [];
  isoStress.c = [];
  
  isoStress.mK = [];
  isoStress.cK = [];
  
  isoStress.mInverse = [];
  isoStress.cInverse = [];

  isoStress.mKInverse = [];
  isoStress.cKInverse = [];

  for r=1:length(creepData.T)
    for c=1:length(creepData.tr)
      currentStress = creepData.stress(r,c);

      if( currentStress > 0 ) % Check if the stress value is valid
        stressDistances = abs( creepData.stress - currentStress );
        validValues = ( stressDistances <= tolerance );
        [validRows,validCols] = find(validValues);

        if( ( length(validCols) ) > 1 && ( length(validCols) == length(validRows) ) ) % Check for atleast 2 different time to ruptures
          if( length(validCols) == length(validRows) )
            averageStress = 0;
            rawData = struct;
            rawData.stressData = zeros(length(validCols) , 1);
            rawData.trData = zeros(length(validCols) , 1);            
            rawData.TData = zeros(length(validRows), 1 );

            for i=1:length(validCols)
              averageStress += creepData.stress( validRows(i), validCols(i) );
              rawData.stressData(i) = creepData.stress( validRows(i), validCols(i) );
              rawData.trData(i) = creepData.tr( validCols(i) );
              rawData.TData(i) = creepData.T( validRows(i) );
            end

            averageStress = averageStress / length(validCols);
            currentKey = num2str(averageStress, "%.2f");

            stressExists = false;

            stressMatches = ( isoStress.stress == averageStress);
            stressExists = !( sum(stressMatches(:)) == 0 );

            if( !stressExists )
              isoStress.stress = vertcat( isoStress.stress, averageStress );
              isoStress.(currentKey) = rawData;
              isoStress.(currentKey).fit = FitIsoStress(rawData);
              isoStress.(currentKey).fitK = FitIsoStress(rawData , true );
              isoStress.(currentKey).fitInverse = FitIsoStress(rawData , false, true );
              isoStress.(currentKey).fitKInverse = FitIsoStress(rawData, true, true );

              isoStress.m = vertcat( isoStress.m , isoStress.(currentKey).fit.m );
              isoStress.c = vertcat( isoStress.c , isoStress.(currentKey).fit.c );
              
              isoStress.mK = vertcat( isoStress.mK , isoStress.(currentKey).fitK.m );
              isoStress.cK = vertcat( isoStress.cK , isoStress.(currentKey).fitK.c );
              
              isoStress.mInverse = vertcat( isoStress.mInverse , isoStress.(currentKey).fitInverse.m );
              isoStress.cInverse = vertcat( isoStress.cInverse , isoStress.(currentKey).fitInverse.c );

              isoStress.mKInverse = vertcat( isoStress.mKInverse , isoStress.(currentKey).fitKInverse.m );
              isoStress.cKInverse = vertcat( isoStress.cKInverse , isoStress.(currentKey).fitKInverse.c );
            end
          end
        end
      end
    end
  end

  isoStress.stressSorted = sort( isoStress.stress );
end