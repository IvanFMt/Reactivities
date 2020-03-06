using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            

            private readonly IJwtGenerator _jwtGenerator;
            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _mapper = mapper;
                _db = context;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                if(await _db.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new {Email = "Email already exists"});

                if(await _db.Users.Where(x => x.UserName == request.Username).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new {Email = "Username already exists"});

                var user = _mapper.Map<AppUser>(request);

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded){
                    return new User{
                        DisplayName = request.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        Username = request.Username,
                        Image = null
                    };
                }
                throw new Exception("Problem creating user");
            }
        }
    }
}