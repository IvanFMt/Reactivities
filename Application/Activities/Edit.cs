using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _db = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {   
                try{
                    Activity activityRequest = _mapper.Map<Activity>(request);

                    Activity activity = await _db.Activities.FindAsync(request.Id);

                    if(activity == null) throw new Exception("Activity not found");

                    activity.Title = request.Title ?? activity.Title;
                    activity.Description = request.Description ?? activity.Description;
                    activity.Category = request.Category ?? activity.Category;
                    activity.Date = request.Date ?? activity.Date;
                    activity.City = request.City ?? activity.City;
                    activity.Venue = request.Venue ?? activity.Venue;
                    await _db.SaveChangesAsync();
            
                    return Unit.Value;
                }
                catch{
                    throw new Exception("Ocurrio un error al actualizar");
                }

            }
        }   
    }
}