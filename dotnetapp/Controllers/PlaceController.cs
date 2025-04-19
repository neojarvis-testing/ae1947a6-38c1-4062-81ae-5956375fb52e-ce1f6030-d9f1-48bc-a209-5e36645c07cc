using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Services;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaceController : ControllerBase
    {
        private readonly PlaceService placeService;

        public PlaceController(PlaceService ps){
            placeService=ps;
        }

        [HttpGet]
        [Authorize(Roles = "Guide,Traveller")]
        public async Task<ActionResult<IEnumerable<Place>>> GetAllPlaces(){
            var place=await placeService.GetAllPlaces();
            return Ok(place);    
        }

        [HttpGet("{placeId}")]
        [Authorize(Roles = "Guide,Traveller")]
        public async Task<ActionResult<IEnumerable<Place>>> GetPlaceById(int placeId){
            var place=await placeService.GetPlaceById(placeId);
            if(place == null){
                return NotFound("Cannot find any place");
            }
            return Ok(place);
        }

        [HttpPost]
        [Authorize(Roles="Guide")]
        public async Task<ActionResult> AddPlace([FromBody] Place place){
            try{
                var success = await placeService.AddPlace(place);
                if(success == null){
                    return StatusCode(500,"Failed to add place");
                }
                return Ok("Place added successfully");

            }
            catch(Exception e){
                return StatusCode(500,e.Message);
            }
        }

        [HttpPut("{placeId}")]
        [Authorize(Roles="Guide")]
        public async Task<ActionResult> UpdatePlace(int placeId,[FromBody] Place place){
            try{
                var success = await placeService.GetPlaceById(placeId);

                if(success == null){
                    return NotFound("Cannot find any place");
                }
                await placeService.UpdatePlace(placeId,place);
                return Ok("Place updated successfully");
            }
            catch(Exception e){
                return StatusCode(500,e.Message);
            }
        }

        [HttpDelete("{placeId}")]
        [Authorize(Roles="Guide")]
        public async Task<ActionResult> DeletePlace(int placeId){
            try{
                var success = await placeService.DeletePlace(placeId);

                if(success == null){
                    return NotFound("Cannot find any place");
                }
                return Ok("Place deleted successfully");
            }
            catch(Exception e){
                return StatusCode(500,e.Message);
            }
        }
    }
}