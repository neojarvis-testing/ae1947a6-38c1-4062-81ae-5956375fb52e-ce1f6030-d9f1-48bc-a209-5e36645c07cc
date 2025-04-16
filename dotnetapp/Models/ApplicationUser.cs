using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace dotnetapp.Models
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(30)]
        public string Name{get; set;} 
    }
}