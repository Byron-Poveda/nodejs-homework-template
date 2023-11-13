const extractTokenFromBearerHeader = (bearerHeader) => {
    // Verifica si el encabezado Bearer está presente y tiene un formato válido
    if (typeof bearerHeader === 'string' && bearerHeader.startsWith('Bearer ')) {
      // Extrae el token después del texto 'Bearer '
      return bearerHeader.slice(7).trim();
    }
    
    return null;
  };

module.exports = extractTokenFromBearerHeader;