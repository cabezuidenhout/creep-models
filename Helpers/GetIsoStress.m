% Copyright © 2018 CA Bezuidenhout
% This file is part of creep-models.
%
% creep-models is free software: you can redistribute it and/or modify
% it under the terms of the GNU General Public License as published by
% the Free Software Foundation, either version 3 of the License, or
% (at your option) any later version.
%
% creep-models is distributed in the hope that it will be useful,
% but WITHOUT ANY WARRANTY; without even the implied warranty of
% MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
% GNU General Public License for more details.
%
% You should have received a copy of the GNU General Public License
% along with creep-models.  If not, see <http://www.gnu.org/licenses/>.
%=====================================================================
function isoStress = GetIsoStress( creepData, tolerance = 0)
  isoStress.tr = creepData.tr;

  for i=1:length(creepData.T)
    stressTemp = abs(creepData.stress - creepData.stress(i,1));

    validValues = (stressTemp <= tolerance);

    [validRows, validCols] = find(validValues);

    if( length(validCols) > 1 &&  (length( unique(validCols) ) == length( validCols ) ) )
      if( length(validCols) == length(validRows) ) 
        averageStress = 0;

        for j=1:length(validCols)
          averageStress += creepData.stress(validRows(j), validCols(j) );
          TTemp(j) = creepData.T(validRows(j));
        end

        if( isfield(isoStress, 'stress') )
          isoStress.stress( length(isoStress.stress) + 1) = averageStress / length(validCols);
          isoStress.T = vertcat(isoStress.T, TTemp);
          isoStress.tr = vertcat( isoStress.tr, creepData.tr);
        else
          isoStress.stress = averageStress / length(validCols);
          isoStress.T = TTemp;
          isoStress.tr = creepData.tr;
        endif
      end            
    end
  end

  isoStress.tolerance = tolerance;
  isoStress.material = creepData.material;

  if( isfield( isoStress, 'stress') )
    isoStress.stress = isoStress.stress';

    currentFit = FitRegression( nOrderX( isoStress.T(1,:)',1) , log10( isoStress.tr(1,:)' ) );
    currentFitInverse = FitRegression( nOrderX( (1./isoStress.T(1,:))',1) , log10( isoStress.tr(1,:)' ) );

    isoStress.fit.m = currentFit(2);
    isoStress.fit.c = currentFit(1);
    isoStress.fit.T = [isoStress.T(1,1), isoStress.T(1,size(isoStress.T,2))];
    isoStress.fit.tr = [ PredictRegression( currentFit, nOrderX( isoStress.T(1,1), 1)) , PredictRegression( currentFit, nOrderX( isoStress.T(1, size(isoStress.T,2) ), 1)) ];

    isoStress.fitInverse.m = currentFitInverse(2);
    isoStress.fitInverse.c = currentFitInverse(1);
    isoStress.fitInverse.T = [1/isoStress.T(1,1), 1/isoStress.T(1,size(isoStress.T,2))];
    isoStress.fitInverse.tr = [ PredictRegression( currentFitInverse, nOrderX( 1/isoStress.T(1,1), 1)) , PredictRegression( currentFitInverse, nOrderX( 1/isoStress.T(1, size(isoStress.T,2) ), 1)) ];


    for i=2:length( isoStress.stress )
      currentFit = FitRegression( nOrderX( isoStress.T(i,:)',1) , log10( isoStress.tr(i,:)' ) );
      currentFitInverse = FitRegression( nOrderX( (1./isoStress.T(i,:))',1) , log10( isoStress.tr(i,:)' ) );

      isoStress.fit.m = horzcat(isoStress.fit.m, currentFit(2));
      isoStress.fit.c = horzcat(isoStress.fit.c, currentFit(1));
      isoStress.fit.T = vertcat(isoStress.fit.T, [isoStress.T(i,1), isoStress.T(i,size(isoStress.T,2))]);
      isoStress.fit.tr = vertcat(isoStress.fit.tr, [ PredictRegression( currentFit, nOrderX( isoStress.T(i,1), 1)) , PredictRegression( currentFit, nOrderX( isoStress.T(i, size(isoStress.T,2) ), 1)) ]);

      isoStress.fitInverse.m = horzcat(isoStress.fitInverse.m, currentFitInverse(2));
      isoStress.fitInverse.c = horzcat(isoStress.fitInverse.c, currentFitInverse(1));
      isoStress.fitInverse.T = vertcat(isoStress.fitInverse.T, [1/isoStress.T(i,1), 1/isoStress.T(i,size(isoStress.T,2))]);
      isoStress.fitInverse.tr = vertcat(isoStress.fitInverse.tr, [ PredictRegression( currentFitInverse, nOrderX( 1/isoStress.T(i,1), 1)) , PredictRegression( currentFitInverse, nOrderX( 1/isoStress.T(i, size(isoStress.T,2) ), 1)) ]);
    end
  end
endfunction