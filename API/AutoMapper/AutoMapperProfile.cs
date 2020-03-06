using AutoMapper;
using Domain;

namespace API.AutoMapperProfile
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Activity, Application.Activities.Create.Command>()
                .ReverseMap();

            CreateMap<Activity, Application.Activities.Edit.Command>()
                .ReverseMap()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<AppUser, Application.Users.Register.Command>()
                .ReverseMap();
        }
    }
}