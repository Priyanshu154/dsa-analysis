calendar = []
for i in range( 0,12 ):
    month = []
    for j in range( 0,4 ):
        month.append( [] )
    calendar.append( month )


def get_index( name ):
    months = ['january','february','march','april','may','june','july','august','september','october','november','december','january','february','march','april','may','june','july','august','september','october','november','december']
    ind = months.index( name.lower() )
    if( ind != -1 ):
        return ind
    else:
        return -1

month = "july"
week = 2
calendar[ get_index(month) ][ week-1 ].append(
    '''Orientation: \nDay 1: Welcome ceremony\n\
       Day 2: Principal sir's speech \n\
       Day 3: Industry visit \n\
       Day 4: Showing different labs of college \n\
       Day 5: Introduction of seniors\n\
       Day 6: Introduction to different clubs in college\n\
       Day 7: Teaching about Subject outcome\n'''
    )

print( calendar[ get_index("july") ][week-1] )
