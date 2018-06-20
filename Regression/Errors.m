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
function errors = Errors( predicted, actual )
  if( size(predicted) == size(actual) )
    errors.difference = predicted - actual;    
    errors.percentage = 100.*( errors.difference ./ actual );
    errors.percentage( isnan(errors.percentage) ) = 0;

    errors.averageDifference = mean( errors.difference(:) );
    errors.averageAbsoluteDifference = mean( abs(errors.difference(:)) );
    errors.averagePercentage = mean( errors.percentage(:) );
    errors.averageAbsolutePercentage = mean( abs(errors.percentage(:)) );

    errors.minDifference = min( errors.difference(:) );
    errors.maxDifference = max( errors.difference(:) );
    errors.minAbsoluteDifference = min( abs(errors.difference(:)) );
    errors.maxAbsoluteDifference = max( abs(errors.difference(:)) );
    errors.minPercentage = min( errors.percentage(:) );
    errors.maxPercentage = max( errors.percentage(:) );
    errors.minAbsolutePercentage = min( abs( errors.percentage(:) ) );
    errors.maxAbsolutePercentage = max( abs( errors.percentage(:) ) );

    errors.MSE = mean( errors.difference(:).^2 );
    errors.R = RSquare( predicted(:), actual(:) );
  else
    printf('Perdicted and Actual must have same size\n');
  end
endfunction