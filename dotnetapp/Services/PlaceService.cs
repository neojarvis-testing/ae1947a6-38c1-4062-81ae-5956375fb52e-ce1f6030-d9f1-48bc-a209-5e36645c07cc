using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class PlaceService
    {
        private readonly ApplicationDbContext _context;

        public PlaceService(ApplicationDbContext context)
        {
            _context=context;
        }

        public async Task<IEnumerable<Place>> GetAllPlaces()
        {
            return await _context.Places.ToListAsync();
        }

        public async Task<Place> GetPlaceById(int placeId)
        {
            return await _context.Places.FindAsync(placeId);   
        }

        public async Task<bool> AddPlace(Place place)
        {
            var existingPlace=await _context.Places.FindAsync(place.PlaceId);

            if(existingPlace != null)
            {
                return false;
            }
            _context.Places.Add(place); 
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdatePlace(int placeId,Place place)
        {
            var existingPlace=await _context.Places.FindAsync(placeId);

            if(existingPlace == null)
            {
                return false;
            }
<<<<<<< HEAD

            if( _context.Places.Any(p => p.Category==place.Category && p.PlaceId !=placeId))
=======
<<<<<<< HEAD



=======
          
<<<<<<< HEAD
>>>>>>> 445b26c08c45d964bf66ecff1703c4c694e2c997
            if(_context.Places.Any(p => p.Category==place.Category && p.PlaceId !=placeId))
>>>>>>> 7c8dfbf1ea9b2806a0c29405117b668228da1ef7
            {
                return false;
            }
=======
            // if(_context.Places.Any(p => p.Category==place.Category && p.PlaceId !=placeId))
            // {
            //     return false;
            // }
>>>>>>> 351a91e82b8aa2f44a650125d57202166d2be9d9

            existingPlace.Name=place.Name;
            existingPlace.Category=place.Category;
            existingPlace.BestTimeToVisit=place.BestTimeToVisit;
            existingPlace.PlaceImage=place.PlaceImage;
            existingPlace.Location=place.Location;
            await _context.SaveChangesAsync();
            return true;
            
        }

        public async Task<bool> DeletePlace(int placeId){
            var existingPlace=await _context.Places.FindAsync(placeId);
            if(existingPlace != null){
                _context.Places.Remove(existingPlace);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;

        }
        
    }
}