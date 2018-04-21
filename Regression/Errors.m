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
function errors = Errors( predicted, actual )
  if( size(predicted) == size(actual) )
    errors.Err = predicted -  actual;
    errors.Abs = abs( errors.Err );
    errors.Percentage = 100.*( errors.Err ./ actual );

    errors.Average = mean( errors.Err(:) );
    errors.AverageAbs = mean( errors.Abs(:) );
    errors.AveragePercentage = mean( errors.Percentage(:) );
    errors.AverageAbsPercentage = mean( abs(errors.Percentage(:)) );

    errors.Min = min( errors.Err(:) );
    errors.Max = max( errors.Err(:) );
    errors.MinAbs = min( errors.Abs(:) );
    errors.MaxAbs = max( errors.Abs(:) );

    errors.minPercentage = min( errors.Percentage(:) );
    errors.maxPercentage = max( errors.Percentage(:) );
    errors.minAbsPercentage = min( abs( errors.Percentage(:) ) );
    errors.maxAbsPercentage = max( abs( errors.Percentage(:) ) );

    errors.MSE = mean( errors.Err(:).^2 );
    errors.R = RSquare( predicted(:), actual(:) );

    errors.Err = errors.Err';
    errors.Abs = errors.Abs';
    erros.Percentage = errors.Percentage';
  else
    printf('Perdicted and Actual must have same size\n');
  end
endfunction