using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _db;
            public Handler(DataContext db) 
            { 
                _db = db;
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _db.Activities.FindAsync(request.Id);
                if(activity == null) throw new RestException(HttpStatusCode.NotFound, new {activity = "Not found" });

                return activity;
            }
        }

    }
}