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

  count = 0;

  for r=1:length(creepData.T)
    for c=1:length( creepData.tr)
      currentStress = creepData.stress(r,c);

      if( currentStress > 0 )
        stressDistances = abs(creepData.stress - currentStress );
        validValues = ( stressDistances <= tolerance );
        [validRows, validCols] = find(validValues);

        if( length(validCols) > 1 )
          if( length(validCols) == length( validRows) )
            averageStress = 0;
            stressData = zeros(1, length(validCols) );
            trData = zeros(1, length(validCols) );
            TData = zeros(1, length(validRows) );

            for i=1:length(validCols)
                averageStress += creepData.stress( validRows(i), validCols(i) );
                stressData(i) = creepData.stress( validRows(i), validCols(i) );
                trData(i) = creepData.tr( validCols(i) );
                TData(i) = creepData.T( validRows(i) );
            end 

            averageStress = averageStress / length(validCols);

            if( isfield(isoStress, 'stress') )
              
              stressMatches = ( isoStress.stress == averageStress);

              if( sum(stressMatches(:)) == 0 )
                isoStress.stress = vertcat( isoStress.stress, averageStress);
                isoStress.stressData.(num2str(averageStress)) = stressData;
                isoStress.trData.(num2str(averageStress)) = trData;
                isoStress.TData.(num2str(averageStress)) = TData;
                isoStress.TDataK.(num2str(averageStress)) = ConvTemp(TData,'c','k');

                currentFit = FitRegression( nOrderX( TData',1) , log10(trData') );
                isoStress.fit.m.(num2str(averageStress)) = currentFit(2);
                isoStress.fit.c.(num2str(averageStress)) = currentFit(1);
                isoStress.fit.T.(num2str(averageStress)) = [ min(TData), max(TData) ];
                x1 = nOrderX( min(TData) , 1 );
                x2 = nOrderX( max(TData) , 1 );
                isoStress.fit.tr.(num2str(averageStress)) = [ PredictRegression(currentFit,x1), PredictRegression(currentFit,x2) ];

                currentFit = FitRegression( nOrderX( ConvTemp(TData,'c','k')',1) , log10(trData') );
                isoStress.fitK.m.(num2str(averageStress)) = currentFit(2);
                isoStress.fitK.c.(num2str(averageStress)) = currentFit(1);
                isoStress.fitK.T.(num2str(averageStress)) = [ min(ConvTemp(TData,'c','k')), max(ConvTemp(TData,'c','k')) ];
                x1 = nOrderX( min(ConvTemp(TData,'c','k')) , 1 );
                x2 = nOrderX( max(ConvTemp(TData,'c','k')) , 1 );
                isoStress.fitK.tr.(num2str(averageStress)) = [ PredictRegression(currentFit,x1), PredictRegression(currentFit,x2) ];

                currentFit = FitRegression( nOrderX( (1./TData)',1) , log10(trData') );
                isoStress.fitInverse.m.(num2str(averageStress)) = currentFit(2);
                isoStress.fitInverse.c.(num2str(averageStress)) = currentFit(1);
                isoStress.fitInverse.T.(num2str(averageStress)) = [ min((1./TData)), max((1./TData)) ];
                x1 = nOrderX( min((1./TData)) , 1 );
                x2 = nOrderX( max((1./TData)) , 1 );
                isoStress.fitInverse.tr.(num2str(averageStress)) = [ PredictRegression(currentFit,x1), PredictRegression(currentFit,x2) ];              

                currentFit = FitRegression( nOrderX( (1./ConvTemp(TData,'c','k'))',1) , log10(trData') );
                isoStress.fitInverseK.m.(num2str(averageStress)) = currentFit(2);
                isoStress.fitInverseK.c.(num2str(averageStress)) = currentFit(1);
                isoStress.fitInverseK.T.(num2str(averageStress)) = [ min((1./ConvTemp(TData,'c','k'))), max((1./ConvTemp(TData,'c','k'))) ];
                x1 = nOrderX( min((1./ConvTemp(TData,'c','k'))) , 1 );
                x2 = nOrderX( max((1./ConvTemp(TData,'c','k'))) , 1 );
                isoStress.fitInverseK.tr.(num2str(averageStress)) = [ PredictRegression(currentFit,x1), PredictRegression(currentFit,x2) ]; 
              end 
            else
              isoStress.stress = averageStress;
              isoStress.stressData.(num2str(averageStress)) = stressData;
              isoStress.trData.(num2str(averageStress)) = trData;
              isoStress.TData.(num2str(averageStress)) = TData;
              isoStress.TDataK.(num2str(averageStress)) = ConvTemp(TData,'c','k');

              currentFit = FitRegression( nOrderX( TData',1) , log10(trData') );
              isoStress.fit.m.(num2str(averageStress)) = currentFit(2);
              isoStress.fit.c.(num2str(averageStress)) = currentFit(1);
              isoStress.fit.T.(num2str(averageStress)) = [ min(TData), max(TData) ];
              x1 = nOrderX( min(TData) , 1 );
              x2 = nOrderX( max(TData) , 1 );
              isoStress.fit.tr.(num2str(averageStress)) = [ PredictRegression(currentFit,x1), PredictRegression(currentFit,x2) ];

              currentFit = FitRegression( nOrderX( ConvTemp(TData,'c','k')',1) , log10(trData') );
              isoStress.fitK.m.(num2str(averageStress)) = currentFit(2);
              isoStress.fitK.c.(num2str(averageStress)) = currentFit(1);
              isoStress.fitK.T.(num2str(averageStress)) = [ min(ConvTemp(TData,'c','k')), max(ConvTemp(TData,'c','k')) ];
              x1 = nOrderX( min(ConvTemp(TData,'c','k')) , 1 );
              x2 = nOrderX( max(ConvTemp(TData,'c','k')) , 1 );
              isoStress.fitK.tr.(num2str(averageStress)) = [ PredictRegression(currentFit,x1), PredictRegression(currentFit,x2) ];

              currentFit = FitRegression( nOrderX( (1./TData)',1) , log10(trData') );
              isoStress.fitInverse.m.(num2str(averageStress)) = currentFit(2);
              isoStress.fitInverse.c.(num2str(averageStress)) = currentFit(1);
              isoStress.fitInverse.T.(num2str(averageStress)) = [ min((1./TData)), max((1./TData)) ];
              x1 = nOrderX( min((1./TData)) , 1 );
              x2 = nOrderX( max((1./TData)) , 1 );
              isoStress.fitInverse.tr.(num2str(averageStress)) = [ PredictRegression(currentFit,x1), PredictRegression(currentFit,x2) ];              

              currentFit = FitRegression( nOrderX( (1./ConvTemp(TData,'c','k'))',1) , log10(trData') );
              isoStress.fitInverseK.m.(num2str(averageStress)) = currentFit(2);
              isoStress.fitInverseK.c.(num2str(averageStress)) = currentFit(1);
              isoStress.fitInverseK.T.(num2str(averageStress)) = [ min((1./ConvTemp(TData,'c','k'))), max((1./ConvTemp(TData,'c','k'))) ];
              x1 = nOrderX( min((1./ConvTemp(TData,'c','k'))) , 1 );
              x2 = nOrderX( max((1./ConvTemp(TData,'c','k'))) , 1 );
              isoStress.fitInverseK.tr.(num2str(averageStress)) = [ PredictRegression(currentFit,x1), PredictRegression(currentFit,x2) ]; 
            end
          end
        end
      end
    end
  end

  isoStress.material = creepData.material;
  isoStress.tolerance = tolerance;

  if( isfield(isoStress, 'stress') )
    isoStress.stress = sort(isoStress.stress);
  end
  
endfunction