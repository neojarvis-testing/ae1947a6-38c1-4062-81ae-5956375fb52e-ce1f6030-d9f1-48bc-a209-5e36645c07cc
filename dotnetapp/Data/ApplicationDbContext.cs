using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;


namespace dotnetapp.Data
{
    public class ApplicationDbContext : DbContext{

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :base(options){}

        public DbSet<Place> Places{get;set;}

        public DbSet<User> Users{get;set;}

    }
}