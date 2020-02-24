using Application.Activities;
using AutoMapper;
using Domain;

namespace API.AutoMapperProfile
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Activity, Create.Command>()
                .ReverseMap();

            CreateMap<Activity, Edit.Command>()
                .ReverseMap()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}